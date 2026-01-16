"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { IMAGES } from "@/app/lib/images";
import ButtonLoading from "@/app/appcomponents/ButtonLoading";
import Link from "next/link";
import { WEBSITE_LOGIN } from "@/routes/WebsiteRouter";
import axios from "axios";

// --------------------
// Zod Schema
// --------------------
const formSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const RegisterPage = () => {
  const [loading, setLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

const handleRegisterSubmit = async (values) => {
  try {
    setLoading(true);
    const { data: registerResponse } = await axios.post("/api/auth/register", values);
    if (!registerResponse.success) {
      throw new Error(registerResponse.message);
    }
    form.reset();
    alert(registerResponse.message);

  } catch (error) {
    alert(error.message || "Registration failed. Please try again.");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <Card className="w-112.5">
        <CardContent className="space-y-6 py-8">

          {/* Logo */}
          <div className="flex justify-center">
            <img src={IMAGES.logo} alt="logo" width={100} height={100} />
          </div>

          {/* Heading */}
          <div className="text-center space-y-1">
            <h1 className="text-3xl font-bold">Create Account</h1>
            <p className="text-sm text-muted-foreground">
              Register into your account by filling out the form below.
            </p>
          </div>

          {/* Form */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleRegisterSubmit)} className="space-y-6">

              {/* Name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="example@gmail.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Password */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Confirm Password */}
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Submit */}
              <div className="mb-3">
                <ButtonLoading loading={loading} type="submit" text="Create Account" className="w-full bg-black text-white cursor-pointer" />
              </div>

              <div className="text-center">
                <p>
                  Already have an account?{" "}
                  <Link href={WEBSITE_LOGIN} className="text-blue-500 hover:underline">
                    Login
                  </Link>
                </p>
              </div>

            </form>
          </Form>

        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterPage;
