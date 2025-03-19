<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class RentResource extends JsonResource
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
            'no_car' => $this->no_car,
            'date_borrow' => $this->date_borrow,
            'date_return' => $this->date_return,
            'discount' => $this->discount,
            'down_payment' => $this->down_payment,
            'total' => $this->total
        ];
    }
}
