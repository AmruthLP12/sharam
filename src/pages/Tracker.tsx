import { useQuery } from "@tanstack/react-query";
import { getTrackerData, getImageUrl } from "@/services/tracker";
import { Link } from "react-router-dom";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";

const Tracker = () => {
  const {
    data = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["tracker"],
    queryFn: getTrackerData,
  });

  return (
    <>
    <Navbar />
    <div className="min-h-screen bg-muted/40 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Tracker</h1>

        <Link to="/tracker/add">
          <Button>Add Entry</Button>
        </Link>
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-4 space-y-3">
                <div className="h-40 bg-muted rounded-lg" />
                <div className="h-4 bg-muted rounded w-3/4" />
                <div className="h-3 bg-muted rounded w-full" />
                <div className="h-3 bg-muted rounded w-5/6" />
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Error */}
      {isError && (
        <p className="text-destructive font-medium">
          Something went wrong
        </p>
      )}

      {/* Empty */}
      {!isLoading && data.length === 0 && (
        <p className="text-muted-foreground">No entries found</p>
      )}

      {/* Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {data.map((item) => {
          const imageUrl = getImageUrl(item.imageId);

          return (
            <Card
              key={item.$id}
              className="hover:shadow-xl transition-all duration-300"
            >
              <CardHeader className="p-0">
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt={item.movieName}
                    className="w-full h-40 object-cover rounded-t-2xl"
                  />
                ) : (
                  <div className="w-full h-40 bg-muted flex items-center justify-center text-sm text-muted-foreground rounded-t-2xl">
                    No Image
                  </div>
                )}
              </CardHeader>

              <CardContent className="p-4">
                <CardTitle className="text-lg mb-2">
                  {item.movieName}
                </CardTitle>

                <p className="text-sm text-muted-foreground line-clamp-3">
                  {item.movieDesc}
                </p>
                <p>
                  <span className="text-xs text-muted-foreground">
                    Created by {item.userName || "Unknown User"} - {item.userEmail || "No Email"}
                  </span>
                  
                </p>
              </CardContent>

              <CardFooter className="text-xs text-muted-foreground px-4 pb-4">
                Created:{" "}
                {new Date(item.$createdAt).toDateString()}
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
    </>
  );
};

export default Tracker;