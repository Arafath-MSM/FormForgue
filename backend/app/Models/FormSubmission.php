<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class FormSubmission extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'form_id',
        'ip_address',
    ];

    /**
     * Get the form that owns the submission.
     */
    public function form(): BelongsTo
    {
        return $this->belongsTo(Form::class);
    }

    /**
     * Get the answers for the submission.
     */
    public function answers(): HasMany
    {
        return $this->hasMany(SubmissionAnswer::class, 'submission_id');
    }
}
