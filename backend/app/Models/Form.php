<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Form extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'title',
        'description',
    ];

    /**
     * Get the fields for the form.
     */
    public function fields(): HasMany
    {
        return $this->hasMany(FormField::class)->orderBy('order');
    }

    /**
     * Get the submissions for the form.
     */
    public function submissions(): HasMany
    {
        return $this->hasMany(FormSubmission::class);
    }
}
