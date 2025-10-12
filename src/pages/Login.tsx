import { useNavigate } from "react-router";
import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useLoginMutation } from "@/services/auth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

type FormValues = z.infer<typeof schema>;

export default function Login() {
  const navigate = useNavigate();
  const [login, { isLoading, error }] = useLoginMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (values: FormValues) => {
    const response = await login({
      username: values.username,
      password: values.password,
    }).unwrap();
    if (response) {
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-b from-slate-50 to-white">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8 sm:p-10 ring-1 ring-slate-100"
      >
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold mb-2">
            PQ
          </div>
          <h1 className="text-2xl font-semibold text-slate-800">
            Welcome back
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Sign in to your PayQuick account
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-left text-sm font-medium text-slate-700">
              Username
            </label>
            <input
              {...register("username")}
              className={`mt-1 block w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition ${
                errors.username ? "ring-2 ring-red-300" : ""
              }`}
              placeholder="jane.dev"
            />
            {errors.username && (
              <p className="text-sm text-red-600 mt-1 text-left">
                {errors.username.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-left text-sm font-medium text-slate-700">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                {...register("password")}
                className={`mt-1 block w-full rounded-xl border border-slate-200 px-4 py-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition ${
                  errors.password ? "ring-2 ring-red-300" : ""
                }`}
                placeholder="••••••••"
                aria-invalid={errors.password ? "true" : "false"}
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                aria-pressed={showPassword}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute inset-y-0 right-3 flex items-center text-slate-500 hover:text-slate-700 focus:outline-none"
              >
                {showPassword ? (
                  <FiEyeOff className="w-5 h-5" aria-hidden />
                ) : (
                  <FiEye className="w-5 h-5" aria-hidden />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-sm text-red-600 mt-1 text-left">
                {errors.password.message}
              </p>
            )}
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full inline-flex items-center justify-center rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white px-4 py-3 font-medium shadow hover:brightness-95 transition disabled:opacity-60"
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </button>
          </div>
          {error && (
            <p role="alert" className="text-sm text-red-600 mt-2">
              Login failed
            </p>
          )}
        </div>

        <p className="mt-6 text-xs text-black-400">
          Use <b>username</b>: <i className="text-indigo-600">jane</i> and <b>password</b>: <i className="text-indigo-600">password123</i> for this demo.
        </p>
      </form>
    </div>
  );
}
