"use client";

import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Button,
} from "@heroui/react";

import { useRouter } from "next/navigation";

export default function Profile() {
  const router = useRouter();

  const handleLogout = () => {
    router.push("/");
  };

  return (
    <div className="flex-1 flex items-center justify-center ">
      <Card className="max-w-[400px]">
        <CardHeader className="flex gap-3">
          <div className="flex flex-col">
            <p className="text-4xl font-bold">Perfil</p>
          </div>
        </CardHeader>
        <Divider />
        <CardBody>
          <p>
            <strong>Nome:</strong> João da Silva
          </p>
          <p>
            <strong>Email:</strong> joao.silva@email.com
          </p>
        </CardBody>
        <Divider />
        <CardFooter>
          <Button fullWidth color="danger" onPress={handleLogout}>
            Logout
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
