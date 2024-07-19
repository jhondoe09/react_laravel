<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\User;

class UserTest extends TestCase
{
    use RefreshDatabase;

    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function test_example()
    {
        $response = $this->get('http://127.0.0.1:8000/api/users');

        $response->assertStatus(200);
    }
    public function it_can_create_a_user()
    {
        $response = $this->postJson('http://127.0.0.1:8000/api/store', [
            'first_name' => 'John',
            'last_name' => 'Doe',
            'email' => 'john.doe@example.com',
            'contact_number' => '1234567890',
            'password' => 'password',
        ]);

        $response->assertStatus(201);
        $this->assertDatabaseHas('users', [
            'email' => 'john.doe@example.com',
        ]);
    }

    /** @test */
    public function it_can_update_a_user()
    {
        $user = User::factory()->create();

        $response = $this->putJson('http://127.0.0.1:8000/api/update/' . $user->id, [
            'first_name' => 'Jane',
            'last_name' => 'Doe',
            'email' => 'jane.doe@example.com',
            'contact_number' => '0987654321',
        ]);

        $response->assertStatus(200);
        $this->assertDatabaseHas('users', [
            'email' => 'jane.doe@example.com',
        ]);
    }

    /** @test */
    public function it_can_delete_a_user()
    {
        $user = User::factory()->create();

        $response = $this->deleteJson('http://127.0.0.1:8000/api/destroy/' . $user->id);

        $response->assertStatus(204);
        $this->assertDatabaseMissing('users', [
            'id' => $user->id,
        ]);
    }

    /** @test */
    public function it_can_list_users()
    {
        $user = User::factory()->create();

        $response = $this->getJson('http://127.0.0.1:8000/api/users');

        $response->assertStatus(200);
        $response->assertJsonFragment([
            'email' => $user->email,
        ]);
    }
}
