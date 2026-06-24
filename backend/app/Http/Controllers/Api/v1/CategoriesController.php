<?php

namespace App\Http\Controllers\Api\v1;

use App\Http\Controllers\Controller;
use App\Http\Requests\CreateCategoryRequest;
use App\Http\Requests\UpdateCategoryRequest;
use App\Http\Resources\CategoryCollection;
use App\Http\Resources\CategoryResource;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoriesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $search = request('search');
        $archived = request('archived') === 'true';
        $cats = Category::query()
            ->when($search, function ($query) use ($search) {
                $query->where('name', 'like', "%{$search}%");
            })
            ->when($archived, function ($query) {
                $query->onlyTrashed();
            })
            ->latest()
            ->paginate(2)
            ->withQueryString();
        return response()->json([
            'data' => new CategoryCollection($cats),
            'meta' => [
                'current_page' => $cats->currentPage(),
                'last_page' => $cats->lastPage(),
                'total' => $cats->total(),
            ]
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CreateCategoryRequest $request)
    {
        $data = $request->validated();

        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('categories', 'public');
        }
        $cat = Category::create($data);
        return new CategoryResource($cat);
    }

    /**
     * Display the specified resource.
     */
    public function show(Category $category)
    {
        return new CategoryResource($category);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCategoryRequest $request, Category $category)
    {
        $data = $request->validated();
        if ($request->hasFile('image')) {
            $category->deleteImage();
            $data['image'] = $request->file('image')->store('categories', 'public');
        } else if ($request->input('remove_image')) {
            $category->deleteImage();
        }
        $category->update($data);
        return new CategoryResource($category);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $id)
    {
        $category = Category::withTrashed()->findOrFail($id);
        $category->deleteImage();
        $category->forceDelete();
        return response()->json(['message' => 'Category deleted successfully']);
    }

    public function archive(Category $category)
    {
        $category->delete();
        return new CategoryResource($category);
    }

    public function restore(Category $category)
    {
        $category->restore();
        return response()->json(['message' => 'Category restored successfully']);
    }
}
