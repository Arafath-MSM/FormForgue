<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Form;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class FormController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        $forms = Form::with(['fields' => function($query) {
            $query->orderBy('order');
        }])->get();

        return response()->json($forms);
    }

    /**
     * Store a newly created resource in storage.
     */
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

    /**
     * Display the specified resource.
     */
    public function show(Form $form): JsonResponse
    {
        return response()->json($form->load(['fields' => function($query) {
            $query->orderBy('order');
        }]));
    }

    /**
     * Update the specified resource in storage.
     */
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

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Form $form): JsonResponse
    {
        $form->delete();
        return response()->json(['message' => 'Form deleted successfully']);
    }
}
