<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ReturnResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'tenant' => $this->user->name,
            'tenant_id' => $this->user->id,
            'no_car' => $this->rent->no_car,
            'id_penalties' => $this->penalties ?? null,
            'date_borrow' => $this->date_borrow,
            'date_return' => $this->date_return,
            'discount' => $this->discount,
            'total' => $this->total
        ];
    }
}
