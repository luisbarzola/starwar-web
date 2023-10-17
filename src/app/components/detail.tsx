'use client';
import React from "react";
import {Card, CardHeader, CardBody, CardFooter, Divider, Link} from "@nextui-org/react";

export default function App({title, description}:{title:string, description: object}) {
  return (
    <Card className="lex flex-col">
      <CardHeader className="flex gap-3">
        <div className="flex flex-col">
          <p className="font-semibold text-4xl lg:text-6xl">{title}</p>
        </div>
      </CardHeader>
      <Divider/>
      
      {Object.entries(description).map( ([key, value]) => {
        return <>
          <CardBody key={key+value}>
          <p className="font-semibold text-2xl lg:text-3xl pb-2">{key}</p>
          <ul className="flex flex-col gap-2">
            {Object.entries(value as object).map( ([subKey, subValue]) => {
              return <li key={subKey} className="flex flex-row gap-2">
                    <p className="text-default-500">{subKey}:</p>
                    <p>{subValue}</p>
                </li>
            } ) }
          </ul>
        </CardBody>
        <Divider/>
        </>
      })}

    </Card>
  );
}
