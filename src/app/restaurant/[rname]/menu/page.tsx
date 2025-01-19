"use client"
import { useParams } from "next/navigation"
import { useGetMenuListByNameQuery } from "@/services/product/get-menu-list"
import Accordion from "@/shared/Accordian"

export default function MenuPage() {
	const { rname } = useParams<{ rname: string }>()

	const { currentData } = useGetMenuListByNameQuery(rname)

	return (
		<>
			<Accordion sections={currentData?.categories || []} />
		</>
	)
}
