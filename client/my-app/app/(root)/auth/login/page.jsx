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
import { WEBSITE_REGISTER } from "@/routes/WebsiteRouter";
import { FaRegEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
 
// --------------------
// Zod Schema
// --------------------


const Loginpage = () => {
  const [loading, setLoading] = useState(false);
  const [isTypePassword, setIsTypePassword] = useState(true);

  const formSchema = z.object({
     email: z.string().email("Invalid email address"),
      password: z.string().min(6, "Password must be at least 6 characters"),
});

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleLoginSubmit = async (values) => {
    console.log("Login Data:", values);
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <Card className="w-112.5">
        <CardContent className="space-y-6 py-8">
          
          {/* Logo */}
          <div className="flex justify-center">
            <img
              src={IMAGES.logo}
              alt="logo"
              width={100}
              height={100}
            />
          </div>

          {/* Heading */}
          <div className="text-center space-y-1">
            <h1 className="text-3xl font-bold">Login Into Account</h1>
            <p className="text-sm text-muted-foreground">
              Login into your account by filling out the form below.
            </p>
          </div>

          {/* Form */}
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleLoginSubmit)}
              className="space-y-6"
            >
              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="example@gmail.com"
                        {...field}
                      />
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
                      <Input
                        type={isTypePassword ? "password" : "text"}
                        placeholder="••••••••"
                        {...field}
                        />
                    </FormControl>
                        <button className="absolute right-2 top-1/2 transform -translate-y-1/2" type="button" onClick={() => setIsTypePassword(!isTypePassword)}>
                          {isTypePassword ? <FaRegEye /> : <FaRegEyeSlash />}
                        </button>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Submit */}
              <div className="mb-3">
              <ButtonLoading loading={loading} type="submit" text="Login" className="w-full bg-black text-white cursor-pointer"/>
              </div>

              <div className="text-center">
                <p>Don't have an account? <Link href={WEBSITE_REGISTER} className="text-blue-500 hover:underline">crete account!</Link></p>
               
                <div>
                  <Link href="/auth/forget-password" className="flex items-center justify-center mt-2 text-blue-500 hover:underline">
                  Forget Password?
                </Link>
                </div>
              </div>
              
            </form>
          </Form>

        </CardContent>
      </Card>
    </div>
  );
};

export default Loginpage;
