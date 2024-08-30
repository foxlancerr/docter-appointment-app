import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

export function DefaultTabs({tabsData}) {
    console.log(tabsData)
  return (
    <Tabs defaultValue={tabsData[0].label.toLowerCase()} className="w-max">
      <TabsList className="w-full">
      {tabsData?.map((content)=>{
        return <TabsTrigger key={content?.label} value={content?.label?.toLowerCase()}>
<h1 className="text-xl">{content?.label}</h1>

        </TabsTrigger>
      })}
      </TabsList>
           {tabsData?.map((content,index)=>{
        return <TabsContent key={content.label +index} value={content?.label?.toLowerCase()}>
            
            {<content.component/>}
            </TabsContent>
      })}
 
    </Tabs>
  )
}
