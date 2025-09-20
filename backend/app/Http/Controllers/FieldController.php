<?php

namespace App\Http\Controllers;

use App\Models\FormField;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Validator;

class FieldController extends Controller
{
    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'form_id' => 'required|exists:forms,id',
            'label' => 'required|string|max:255',
            'type' => 'required|in:text,textarea,checkbox,radio',
            'options' => 'nullable|array',
            'required' => 'boolean',
            'order' => 'required|integer|min:0'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $field = FormField::create($request->all());

        return response()->json($field, 201);
    }

    public function update(Request $request, FormField $field): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'label' => 'required|string|max:255',
            'type' => 'required|in:text,textarea,checkbox,radio',
            'options' => 'nullable|array',
            'required' => 'boolean',
            'order' => 'required|integer|min:0'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $field->update($request->all());

        return response()->json($field);
    }

    public function destroy(FormField $field): JsonResponse
    {
        $field->delete();
        return response()->json(['message' => 'Field deleted successfully']);
    }
}
