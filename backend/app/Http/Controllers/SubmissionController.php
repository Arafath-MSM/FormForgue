<?php

namespace App\Http\Controllers;

use App\Models\Form;
use App\Models\FormSubmission;
use App\Models\SubmissionAnswer;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Validator;

class SubmissionController extends Controller
{
    public function index(Form $form): JsonResponse
    {
        $submissions = FormSubmission::where('form_id', $form->id)
            ->with(['answers.field'])
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json($submissions);
    }

    public function show(FormSubmission $submission): JsonResponse
    {
        return response()->json($submission->load(['answers.field', 'form']));
    }

    public function store(Request $request, Form $form): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'data' => 'required|array',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Validate form fields based on form configuration
        $validationRules = [];
        $formFields = $form->fields;
        
        foreach ($formFields as $field) {
            $rules = [];
            if ($field->required) {
                $rules[] = 'required';
            } else {
                $rules[] = 'nullable';
            }

            switch ($field->type) {
                case 'text':
                    $rules[] = 'string';
                    break;
                case 'textarea':
                    $rules[] = 'string';
                    break;
                case 'radio':
                    $rules[] = 'string';
                    if ($field->options) {
                        $rules[] = 'in:' . implode(',', $field->options);
                    }
                    break;
                case 'checkbox':
                    $rules[] = 'array';
                    if ($field->options) {
                        $rules[] = 'in:' . implode(',', $field->options);
                    }
                    break;
            }

            $validationRules["data.{$field->id}"] = $rules;
        }

        $fieldValidator = Validator::make($request->all(), $validationRules);

        if ($fieldValidator->fails()) {
            return response()->json(['errors' => $fieldValidator->errors()], 422);
        }

        // Create submission
        $submission = FormSubmission::create([
            'form_id' => $form->id,
            'ip_address' => $request->ip(),
        ]);

        // Create submission answers
        foreach ($request->data as $fieldId => $answer) {
            SubmissionAnswer::create([
                'submission_id' => $submission->id,
                'field_id' => $fieldId,
                'answer' => is_array($answer) ? json_encode($answer) : $answer,
            ]);
        }

        return response()->json($submission->load('answers.field'), 201);
    }
}
