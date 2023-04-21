import { Button } from "@mantine/core";
import { ReactNode } from "react";

interface ButtonProps {
    children: ReactNode,
    styleType?: "normal" | "danger" | "success"
}
export function CustomButton({ children, styleType = "normal" }: ButtonProps) {
    const btnStyle = getBtnStyle(styleType)

    return (
      <Button sx={{ 
            borderRadius: 14,
            height: "2.5rem",
            borderWidth: 1.5,
            transition: "0.2s",
            ...btnStyle
            }}>
                {children}
            </Button>
    );
  }


const getBtnStyle = (styleType: string) => {
    let btnStyle = {};
    switch (styleType) {
        case "normal": 
            btnStyle = {
                color: "white",
                borderColor: "#929292",
                backgroundColor: "#222C32",
                "&:hover": {
                    borderColor: "#fff",
                    backgroundColor: "#222C32",
                }
            }
            break;
        
        case "danger":
            btnStyle = {
                color: "#DB3737",
                borderColor: "#DB3737",
                backgroundColor: "transparent",
                "&:hover": {
                    color: "#fff",
                    backgroundColor: "#DB3737",
                    borderColor: "#929292"
                }
            }
            break;
        
        case "success":
            btnStyle = {
                color: "#2DC962",
                borderColor: "#2DC962",
                backgroundColor: "transparent",
                "&:hover": {
                    color: "#fff",
                    backgroundColor: "#2DC962",
                    borderColor: "#929292"
                }
            }
            break;
    }

    return btnStyle
}