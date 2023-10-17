'use client';
import React from "react";
import {Card, CardHeader, CardBody, CardFooter, Divider, Link, Image} from "@nextui-org/react";

export default function App({title, subTitle, link, description, className}:{title:string, subTitle: string, link?: string, description: object, className?: string}) {
  return (
    <Card className={className ?? 'col-span-12 sm:col-span-4 h-[350px]'}>
      <CardHeader className="flex gap-3">
        <div className="flex flex-col">
          <p className="text-md">{title}</p>
          <p className="text-small text-default-500">{subTitle}</p>
        </div>
      </CardHeader>
      <Divider/>
      <CardBody>
        <ul className="flex flex-col gap-2">
          {Object.entries(description).map( ([key, value]) => {
            return <li key={key} className="flex flex-row gap-2">
                  <p className="text-default-500">{key}:</p>
                  <p>{value}</p>
              </li>
          } ) }
        </ul>
      </CardBody>
      <Divider/>
      { link ?
          <CardFooter>
          <Link
            href={link}
            color="primary"
            isBlock
          >
            Más detalles
          </Link>
        </CardFooter> : 
        null 
      }
    </Card>
  );
}
