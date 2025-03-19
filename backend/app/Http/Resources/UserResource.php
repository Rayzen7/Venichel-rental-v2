<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
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
            'name' => $this->name,
            'rent' => $this->rent->map(function ($rent) {
                return [
                    'id' => $rent->id,
                    'tenant' => $this->name,
                    'no_car' => $rent->no_car,
                    'date_borrow' => $rent->date_borrow,
                    'date_return' => $rent->date_return,
                    'down_payment' => $rent->down_payment,
                    'discount' => $rent->discount,
                    'total' => $rent->total
                ];
            }),
            'penalties' => $this->penalties->map(function ($penalties) {
                $rent = $this->rent->firstwhere('id', $penalties->no_car);
                return [
                    'id' => $penalties->id,
                    'penalties_name' => $penalties->penalties_name,
                    'description' => $penalties->description,
                    'penalties_total' => $penalties->penalties_total,
                    'no_car' => $rent->no_car,
                ];
            }),
            'return' => $this->return->map(function ($return) {
                $rent = $this->rent->firstwhere('id', $return->no_car);
                $penalties = $this->penalties->firstwhere('id', $return->id_penalties);
                return [
                    'id' => $return->id,
                    'tenant' => $this->name,
                    'no_car' => $rent->no_car,
                    'penalties_name' => $penalties->penalties_name,
                    'date_borrow' => $return->date_borrow,
                    'date_return' => $return->date_return,
                    'discount' => $return->discount,
                    'total' => $return->total
                ];
            }),
        ];
    }
}
