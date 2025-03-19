<?php

namespace App\Http\Controllers;

use App\Http\Resources\RentResource;
use App\Models\Rent;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class RentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $rent = Rent::with('user')->get();
        return response()->json([
            'rent' => RentResource::collection($rent)
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validateData = Validator::make($request->all(), [
            'tenant' => 'exists:users,id',
            'no_car' => 'required',
            'date_borrow' => 'required',
            'date_return' => 'required',
            'down_payment' => 'required|numeric',
            'discount' => 'required',
            'total' => 'required|numeric',
        ]);

        if ($validateData->fails()) {
            return response()->json([
                'message' => 'Invalid Fields'
            ], 422);
        }

        Rent::create([
            'tenant' => $request->tenant,
            'no_car' => $request->no_car,
            'date_borrow' => $request->date_borrow,
            'date_return' => $request->date_return,
            'down_payment' => $request->down_payment,
            'discount' => $request->discount,
            'total' => $request->total,
        ]);

        return response()->json([
            'message' => 'Create Rent Success'
        ], 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $rent = Rent::with('user')->findOrFail($id);
        return response()->json([
            'rent' => new RentResource($rent)
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $rent = Rent::with('user')->findOrFail($id);
        $validateData = Validator::make($request->all(), [
            'tenant' => 'exists:users,id',
            'no_car' => 'required',
            'date_borrow' => 'required',
            'date_return' => 'required',
            'down_payment' => 'required|numeric',
            'discount' => 'required',
            'total' => 'required|numeric',
        ]);

        if ($validateData->fails()) {
            return response()->json([
                'message' => 'Invalid Fields'
            ], 422);
        }

        $rent->update([
            'tenant' => $request->tenant,
            'no_car' => $request->no_car,
            'date_borrow' => $request->date_borrow,
            'date_return' => $request->date_return,
            'down_payment' => $request->down_payment,
            'discount' => $request->discount,
            'total' => $request->total,
        ]);

        return response()->json([
            'message' => 'Update Rent Success'
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $rent = Rent::findOrFail($id);
        $rent->delete();
        return response()->json([
            'message' => 'Delete Rent Success'
        ]);
    }
}
