<?php

namespace App\Http\Controllers;

use App\Models\Form;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Validator;

class FormController extends Controller
{
    public function index(): JsonResponse
    {
        $forms = Form::with(['fields' => function($query) {
            $query->orderBy('order');
        }])->get();

        return response()->json($forms);
    }

    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'fields' => 'required|array',
            'fields.*.type' => 'required|in:text,textarea,checkbox,radio',
            'fields.*.label' => 'required|string|max:255',
            'fields.*.required' => 'boolean',
            'fields.*.options' => 'nullable|array',
            'fields.*.order' => 'required|integer|min:0'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $form = Form::create([
            'title' => $request->title,
            'description' => $request->description,
        ]);

        // Create form fields
        foreach ($request->fields as $fieldData) {
            $form->fields()->create([
                'label' => $fieldData['label'],
                'type' => $fieldData['type'],
                'options' => $fieldData['options'] ?? null,
                'required' => $fieldData['required'] ?? false,
                'order' => $fieldData['order'],
            ]);
        }

        return response()->json($form->load('fields'), 201);
    }

    public function show(Form $form): JsonResponse
    {
        return response()->json($form->load(['fields' => function($query) {
            $query->orderBy('order');
        }]));
    }

    public function update(Request $request, Form $form): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'fields' => 'required|array',
            'fields.*.type' => 'required|in:text,textarea,checkbox,radio',
            'fields.*.label' => 'required|string|max:255',
            'fields.*.required' => 'boolean',
            'fields.*.options' => 'nullable|array',
            'fields.*.order' => 'required|integer|min:0'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $form->update([
            'title' => $request->title,
            'description' => $request->description,
        ]);

        // Delete existing fields and recreate them
        $form->fields()->delete();
        
        foreach ($request->fields as $fieldData) {
            $form->fields()->create([
                'label' => $fieldData['label'],
                'type' => $fieldData['type'],
                'options' => $fieldData['options'] ?? null,
                'required' => $fieldData['required'] ?? false,
                'order' => $fieldData['order'],
            ]);
        }

        return response()->json($form->load('fields'));
    }

    public function destroy(Form $form): JsonResponse
    {
        $form->delete();
        return response()->json(['message' => 'Form deleted successfully']);
    }
}
