import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addTrackerData, UploadImage } from "@/services/tracker";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const TrackerForm = () => {
  const queryClient = useQueryClient();

  const [form, setForm] = useState({
    movieName: "",
    movieDesc: "",
  });
  const [file, setFile] = useState<File | null>(null);

  const mutation = useMutation({
    mutationFn: addTrackerData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tracker"] });

      setForm({
        movieName: "",
        movieDesc: "",
      });
      setFile(null);
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let imageId;

    if (file) {
      const uploaded = await UploadImage(file);
      imageId = uploaded ?? undefined;
    }

    mutation.mutate({
      movieName: form.movieName,
      movieDesc: form.movieDesc,
      imageId,
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-muted/40 p-6">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader>
          <CardTitle>Add Tracker Entry</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Image Upload */}
            <div className="space-y-2">
              <Label>Upload Image</Label>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
              />
              {file && (
                <img
                  src={URL.createObjectURL(file)}
                  className=" object-cover rounded-lg"
                />
              )}
            </div>

            {/* Movie Name */}
            <div className="space-y-2">
              <Label>Movie Name</Label>
              <Input
                placeholder="Enter movie name"
                value={form.movieName}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    movieName: e.target.value,
                  }))
                }
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea
                placeholder="Enter description"
                value={form.movieDesc}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    movieDesc: e.target.value,
                  }))
                }
              />
            </div>

            {/* Submit */}
            <Button
              type="submit"
              className="w-full"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? "Saving..." : "Add Entry"}
            </Button>

            {/* Error */}
            {mutation.isError && (
              <p className="text-sm text-destructive">Something went wrong</p>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default TrackerForm;
