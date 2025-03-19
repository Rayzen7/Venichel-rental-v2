<?php

namespace App\Http\Controllers;

use App\Http\Resources\PenaltiesResource;
use App\Models\Penaltie;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PenaltieContoller extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $penalties = Penaltie::with('return', 'rent')->get();
        return response()->json([
            'penalties' => PenaltiesResource::collection($penalties)
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
            'penalties_name' => 'required',
            'description' => 'required',
            'no_car' => 'required|exists:rents,id',
            'penalties_total' => 'required|numeric',
        ]);

        if ($validateData->fails()) {
            return response()->json([
                'message' => 'Invalid Fields'
            ], 422);
        }

        Penaltie::create([
            'penalties_name' => $request->penalties_name,
            'description' => $request->description,
            'no_car' => $request->no_car,
            'penalties_total' => $request->penalties_total
        ]);

        return response()->json([
            'message' => 'Create Penalties Success'
        ], 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $penalties = Penaltie::with('return', 'rent')->findOrFail($id);
        return response()->json([
            'penalties' => new PenaltiesResource($penalties)
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
        $penalties = Penaltie::findOrFail($id);
        $validateData = Validator::make($request->all(), [
            'penalties_name' => 'required',
            'description' => 'required',
            'no_car' => 'required|exists:rents,id',
            'penalties_total' => 'required|numeric',
        ]);

        if ($validateData->fails()) {
            return response()->json([
                'message' => 'Invalid Fields'
            ], 422);
        }

        $penalties->update([
            'penalties_name' => $request->penalties_name,
            'description' => $request->description,
            'no_car' => $request->no_car,
            'penalties_total' => $request->penalties_total
        ]);

        return response()->json([
            'message' => 'Update Penalties Success'
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $penalties = Penaltie::findOrFail($id);
        $penalties->delete();
        return response()->json([
            'message' => 'Delete Penalties Success'
        ], 200);
    }
}
