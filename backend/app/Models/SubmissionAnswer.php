<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class SubmissionAnswer extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'submission_id',
        'field_id',
        'answer',
    ];

    /**
     * Get the submission that owns the answer.
     */
    public function submission(): BelongsTo
    {
        return $this->belongsTo(FormSubmission::class);
    }

    /**
     * Get the field that owns the answer.
     */
    public function field(): BelongsTo
    {
        return $this->belongsTo(FormField::class, 'field_id');
    }
}
