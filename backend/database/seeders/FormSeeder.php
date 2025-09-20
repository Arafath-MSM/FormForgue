<?php

namespace Database\Seeders;

use App\Models\Form;
use App\Models\FormField;
use Illuminate\Database\Seeder;

class FormSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create Contact Form
        $contactForm = Form::create([
            'title' => 'Contact Form',
            'description' => 'Get in touch with us',
        ]);

        FormField::create([
            'form_id' => $contactForm->id,
            'label' => 'Full Name',
            'type' => 'text',
            'required' => true,
            'order' => 1,
        ]);

        FormField::create([
            'form_id' => $contactForm->id,
            'label' => 'Email Address',
            'type' => 'text',
            'required' => true,
            'order' => 2,
        ]);

        FormField::create([
            'form_id' => $contactForm->id,
            'label' => 'Message',
            'type' => 'textarea',
            'required' => true,
            'order' => 3,
        ]);

        // Create Event Registration Form
        $eventForm = Form::create([
            'title' => 'Event Registration',
            'description' => 'Registration form for upcoming events',
        ]);

        FormField::create([
            'form_id' => $eventForm->id,
            'label' => 'Participant Name',
            'type' => 'text',
            'required' => true,
            'order' => 1,
        ]);

        FormField::create([
            'form_id' => $eventForm->id,
            'label' => 'Email',
            'type' => 'text',
            'required' => true,
            'order' => 2,
        ]);

        FormField::create([
            'form_id' => $eventForm->id,
            'label' => 'Event Type',
            'type' => 'select',
            'required' => true,
            'options' => ['Workshop', 'Conference', 'Seminar', 'Networking'],
            'order' => 3,
        ]);

        FormField::create([
            'form_id' => $eventForm->id,
            'label' => 'Attendance Type',
            'type' => 'radio',
            'required' => true,
            'options' => ['In-person', 'Virtual'],
            'order' => 4,
        ]);

        FormField::create([
            'form_id' => $eventForm->id,
            'label' => 'Dietary Restrictions',
            'type' => 'checkbox',
            'required' => false,
            'options' => ['Vegetarian', 'Vegan', 'Gluten-free', 'None'],
            'order' => 5,
        ]);

        // Create Product Feedback Form
        $feedbackForm = Form::create([
            'title' => 'Product Feedback',
            'description' => 'Share your thoughts about our products',
        ]);

        FormField::create([
            'form_id' => $feedbackForm->id,
            'label' => 'Product Name',
            'type' => 'text',
            'required' => true,
            'order' => 1,
        ]);

        FormField::create([
            'form_id' => $feedbackForm->id,
            'label' => 'Rating',
            'type' => 'radio',
            'required' => true,
            'options' => ['1', '2', '3', '4', '5'],
            'order' => 2,
        ]);

        FormField::create([
            'form_id' => $feedbackForm->id,
            'label' => 'Feedback Type',
            'type' => 'checkbox',
            'required' => false,
            'options' => ['Bug Report', 'Feature Request', 'General Feedback', 'Complaint'],
            'order' => 3,
        ]);

        FormField::create([
            'form_id' => $feedbackForm->id,
            'label' => 'Comments',
            'type' => 'textarea',
            'required' => false,
            'order' => 4,
        ]);
    }
}
