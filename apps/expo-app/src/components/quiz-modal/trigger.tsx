import React from "react";
import { DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";


export const Trigger = ({ children }: { children?: React.ReactNode }) => (
  <DialogTrigger asChild>
    <Button variant="outline">
      {children ?? <Text>Open Quiz Settings</Text>}
    </Button>
  </DialogTrigger>
);