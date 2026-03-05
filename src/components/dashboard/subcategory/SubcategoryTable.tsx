"use client";

import { useMemo, useState } from "react";
import { Subcategory } from "@/redux/api/subcategoryApi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface Props {
  subcategories: Subcategory[];
  isLoading: boolean;
  onAdd: () => void;
  onEdit: (subcategory: Subcategory) => void;
  onDelete: (id: string) => void;
}

const ITEMS_PER_PAGE = 5;

export default function SubcategoryTable({
  subcategories,
  isLoading,
  onAdd,
  onEdit,
  onDelete,
}: Props) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    return subcategories.filter((sub) =>
      sub.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [subcategories, search]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);

  const paginated = filtered.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <div className="flex justify-between items-center">
        <Input
          placeholder="Search subcategory..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-64"
        />
        <Button
          onClick={onAdd}
          className="bg-blue-900 hover:bg-blue-800 text-white"
        >
          Add Subcategory
        </Button>
      </div>

      <div className="border rounded-lg overflow-hidden mt-4">
        <table className="w-full text-sm">
          <thead className="bg-blue-50">
            <tr>
              <th className="p-3 text-left">#</th>
              <th className="p-3 text-left">Category</th>
              <th className="p-3 text-left">Subcategory</th>
              <th className="p-3 text-left">Created</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginated.map((sub, index) => (
              <tr key={sub._id} className="border-t hover:bg-blue-50/50">
                <td className="p-3">{index + 1}</td>
                <td className="p-3 font-medium">
                  {sub.category?.name}
                </td>
                <td className="p-3">{sub.name}</td>
                <td className="p-3">
                  {new Date(sub.createdAt).toLocaleDateString()}
                </td>
                <td className="p-3 space-x-2">
                  <Button
                    size="sm"
                    className="bg-blue-900 hover:bg-blue-800 text-white"
                    onClick={() => onEdit(sub)}
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => onDelete(sub._id)}
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
            }
            onClick={() => setPage(i + 1)}
          >
            {i + 1}
          </Button>
        ))}
      </div>
    </>
  );
}