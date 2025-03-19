<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PenaltiesResource extends JsonResource
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
            'penalties_name' => $this->penalties_name,
            'description' => $this->description,
            'no_car' => $this->rent->no_car,
            'penalties_total' => $this->penalties_total,
            'return' => $this->return
        ];
    }
}
