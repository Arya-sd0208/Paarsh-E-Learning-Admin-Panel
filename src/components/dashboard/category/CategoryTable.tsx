"use client";

import { Category } from "@/redux/api/categoryApi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useState, useMemo } from "react";

interface Props {
  categories: Category[];
  isLoading: boolean;
  onAdd: () => void;
  onEdit: (category: Category) => void;
  onDelete: (id: string) => void;
}

const ITEMS_PER_PAGE = 5;

export default function CategoryTable({
  categories,
  isLoading,
  onAdd,
  onEdit,
  onDelete,
}: Props) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    return categories.filter((cat) =>
      cat.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [categories, search]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);

  const paginated = filtered.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="flex justify-between items-center">
        <Input
          placeholder="Search category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-64"
        />
       <Button
  onClick={onAdd}
  className="bg-blue-900 hover:bg-blue-800 text-white"
>Add Category</Button>
      </div>

      <div className="border rounded-lg overflow-hidden mt-4">
        <table className="w-full text-sm">
          <thead className="bg-muted">
            <tr>
              <th className="p-3 text-left">#</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Created</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginated.map((cat, index) => (
              <tr key={cat._id} className="border-t">
                <td className="p-3">{index + 1}</td>
                <td className="p-3 font-medium">{cat.name}</td>
                <td className="p-3">
<Badge
  className={
    cat.isActive
      ? "bg-blue-100 text-blue-900"
      : "bg-red-100 text-red-700"
  }
>                    {cat.isActive ? "Active" : "Inactive"}
                  </Badge>
                </td>
                <td className="p-3">
                  {new Date(cat.createdAt).toLocaleDateString()}
                </td>
                <td className="p-3 space-x-2">
<Button
  size="sm"
  className="bg-blue-900 hover:bg-blue-800 text-white"
  onClick={() => onEdit(cat)}
>                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => onDelete(cat._id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end space-x-2 mt-4">
        {[...Array(totalPages)].map((_, i) => (
          <Button
            key={i}
            size="sm"
className={
  page === i + 1
    ? "bg-blue-900 text-white hover:bg-blue-800"
    : ""
}            onClick={() => setPage(i + 1)}
          >
            {i + 1}
          </Button>
        ))}
      </div>
    </>
  );
}