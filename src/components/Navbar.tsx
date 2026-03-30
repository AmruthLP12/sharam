import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getUser, logout } from "@/services/auth";

const Navbar = () => {
  const location = useLocation();
  const queryClient = useQueryClient();

  const navItems = [
    { name: "Home", path: "/tracker" },
    { name: "Tracker", path: "/tracker" },
    { name: "Add Entry", path: "/tracker/add" },
  ];

  // 🔥 Get logged-in user
  const {
    data: user,
    isLoading,
  } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
    retry: false, // ❗ don't retry if not logged in
  });

  // 🔥 Logout mutation
  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      // clear user cache
      queryClient.setQueryData(["user"], null);

      // optional: clear all queries
      queryClient.invalidateQueries();
    },
  });

  return (
    <nav className="w-full border-b bg-background/80 backdrop-blur sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-3">
        
        {/* Logo */}
        <Link to="/tracker" className="text-xl font-bold tracking-tight">
          🎬 TrackerApp
        </Link>

        {/* Links */}
        <div className="flex items-center gap-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;

            return (
              <Link key={item.path} to={item.path}>
                <Button variant={isActive ? "default" : "ghost"} size="sm">
                  {item.name}
                </Button>
              </Link>
            );
          })}

          {/* 🔥 Auth Section */}
          {isLoading ? null : user ? (
            <div className="flex items-center gap-2 ml-4">
              <span className="text-sm text-gray-600">
                👋 {user.name}
              </span>

              <Button
                size="sm"
                variant="outline"
                onClick={() => logoutMutation.mutate()}
                disabled={logoutMutation.isPending}
              >
                {logoutMutation.isPending ? "..." : "Logout"}
              </Button>
            </div>
          ) : (
            <Link to="/login">
              <Button size="sm">Login</Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;