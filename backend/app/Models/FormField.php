<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class FormField extends Model
{
    protected $fillable = ['form_id', 'label', 'type', 'options', 'required', 'order'];

    protected $casts = [
        'options' => 'array',
        'required' => 'boolean'
    ];

    public function form(): BelongsTo
    {
        return $this->belongsTo(Form::class);
    }

    public function submissionAnswers(): HasMany
    {
        return $this->hasMany(SubmissionAnswer::class, 'field_id');
    }
}
