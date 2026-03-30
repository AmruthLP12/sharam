import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getFilteredTests } from "../services/test";

const Home = () => {
  const [filters, setFilters] = useState({
    difficulty: "",
    active: undefined as boolean | undefined,
  });

  const { data = [], isLoading, isError } = useQuery({
    queryKey: ["tests", filters], // 🔥 important (cache + refetch)
    queryFn: () => getFilteredTests(filters),
  });

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-6">Tests</h1>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <select
          className="border rounded-lg px-3 py-2"
          value={filters.difficulty}
          onChange={(e) =>
            setFilters((prev) => ({
              ...prev,
              difficulty: e.target.value,
            }))
          }
        >
          <option value="">All Difficulty</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>

        <select
          className="border rounded-lg px-3 py-2"
          value={
            filters.active === undefined
              ? ""
              : filters.active
              ? "active"
              : "inactive"
          }
          onChange={(e) => {
            const value = e.target.value;

            setFilters((prev) => ({
              ...prev,
              active:
                value === "" ? undefined : value === "active" ? true : false,
            }));
          }}
        >
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>

        <button
          onClick={() => setFilters({ difficulty: "", active: undefined })}
          className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300"
        >
          Reset
        </button>
      </div>

      {/* 🔥 Loading State */}
      {isLoading && <p>Loading...</p>}

      {/* 🔥 Error State */}
      {isError && <p>Something went wrong</p>}

      {/* Data */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {data.map((item) => (
          <div
            key={item.$id}
            className="bg-white rounded-2xl shadow-md p-5 hover:shadow-lg transition"
          >
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg font-semibold">{item.testName}</h2>

              <span
                className={`text-xs px-2 py-1 rounded-full ${
                  item.difficultyLevel === "hard"
                    ? "bg-red-100 text-red-600"
                    : item.difficultyLevel === "medium"
                    ? "bg-yellow-100 text-yellow-600"
                    : "bg-green-100 text-green-600"
                }`}
              >
                {item.difficultyLevel}
              </span>
            </div>

            <p className="text-gray-600 text-sm mb-4 line-clamp-3">
              {item.description}
            </p>

            <div className="text-sm text-gray-500 space-y-1">
              <p>⏱ {item.durationMinutes} mins</p>
              <p>📂 {item.testCategory}</p>
              <p>
                Status:{" "}
                <span
                  className={item.isActive ? "text-green-600" : "text-red-500"}
                >
                  {item.isActive ? "Active" : "Inactive"}
                </span>
              </p>
            </div>

            <div className="mt-4 text-xs text-gray-400">
              Created: {new Date(item.$createdAt).toLocaleDateString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;