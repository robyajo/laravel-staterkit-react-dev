<?php

namespace App\Actions\Auth;

use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Http;

class ValidateCaptcha
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  callable  $next
     * @return mixed
     */
    public function handle(Request $request, $next)
    {
        // Skip captcha in testing environment or if explicitly disabled
        if (app()->runningUnitTests() || config('app.env') === 'testing') {
            return $next($request);
        }

        $request->validate([
            'g-recaptcha-response' => ['required', 'string'],
        ], [
            'g-recaptcha-response.required' => 'Please complete the CAPTCHA.',
        ]);

        $response = Http::asForm()->post('https://www.google.com/recaptcha/api/siteverify', [
            'secret' => config('services.recaptcha.secret'),
            'response' => $request->input('g-recaptcha-response'),
            'remoteip' => $request->ip(),
        ]);

        if (! $response['success']) {
            throw ValidationException::withMessages([
                'g-recaptcha-response' => ['CAPTCHA verification failed. Please try again.'],
            ]);
        }

        return $next($request);
    }
}
