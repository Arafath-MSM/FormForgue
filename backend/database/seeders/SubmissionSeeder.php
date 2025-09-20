<?php

namespace Database\Seeders;

use App\Models\Form;
use App\Models\FormSubmission;
use App\Models\SubmissionAnswer;
use Illuminate\Database\Seeder;

class SubmissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get the Contact Form (ID 1)
        $contactForm = Form::find(1);
        if ($contactForm) {
            // Create sample submissions for Contact Form
            $submission1 = FormSubmission::create([
                'form_id' => $contactForm->id,
                'ip_address' => '192.168.1.100',
            ]);

            // Add answers for submission 1
            SubmissionAnswer::create([
                'submission_id' => $submission1->id,
                'field_id' => 1, // Full Name
                'answer' => 'John Doe',
            ]);

            SubmissionAnswer::create([
                'submission_id' => $submission1->id,
                'field_id' => 2, // Email Address
                'answer' => 'john.doe@email.com',
            ]);

            SubmissionAnswer::create([
                'submission_id' => $submission1->id,
                'field_id' => 3, // Message
                'answer' => 'I would like to know more about your services.',
            ]);

            // Create second submission
            $submission2 = FormSubmission::create([
                'form_id' => $contactForm->id,
                'ip_address' => '192.168.1.101',
            ]);

            // Add answers for submission 2
            SubmissionAnswer::create([
                'submission_id' => $submission2->id,
                'field_id' => 1, // Full Name
                'answer' => 'Jane Smith',
            ]);

            SubmissionAnswer::create([
                'submission_id' => $submission2->id,
                'field_id' => 2, // Email Address
                'answer' => 'jane.smith@email.com',
            ]);

            SubmissionAnswer::create([
                'submission_id' => $submission2->id,
                'field_id' => 3, // Message
                'answer' => 'Please send me more information about your products.',
            ]);
        }
    }
}
