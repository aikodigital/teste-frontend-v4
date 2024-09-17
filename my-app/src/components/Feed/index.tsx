'use client';

import AccordionComponent from "../Accordion";
import WrapperFilter from '@/components/WrapperFilter';
import { useForm } from "react-hook-form";
import { MagnifyingGlass } from "phosphor-react";
import styles from './Feed.module.css';
import { equipmentData } from "@/mocks/equipamentData";
import { equipamentState } from '@/mocks/equipamentState';
import { z } from 'zod';
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import StickyHeadTable from "@/components/Table";
import dynamic from "next/dynamic";
import { Suspense } from 'react';

const DynamicSelect = dynamic(() => import('../Select'), { ssr: false });

const FormSchema = z.object({
    equip: z.string().optional(),
    status: z.string().optional(),
});

type FormSchema = z.infer<typeof FormSchema>;

function FeedComponent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [data, setData] = useState([]);

    const { control, reset, handleSubmit, formState: { isSubmitting } } = useForm<FormSchema>({
        defaultValues: {
            equip: searchParams.get('equip') || '',
            status: searchParams.get('status') || '',
        }
    });

    const handleSubmitForm = (data: FormSchema) => {
        const query = new URLSearchParams(data as any).toString();
        router.push(`/?${query}`);
    };

    const handleResetForm = () => {
        reset({
            equip: '',
            status: '',
        });
    };

    useEffect(() => {
        const fetchData = async () => {
            const equip = searchParams.get('equip') || '';
            const status = searchParams.get('status') || '';

            const apiUrl = `http://localhost:3000/api/equipaments?equip=${equip}&status=${status}`;
            const response = await fetch(apiUrl, {});
            const result = await response.json();
            setData(result.sortedRows);
        };

        fetchData();
    }, [searchParams]);

    return (
        <section className="container mainContainer">
            <form onSubmit={handleSubmit(handleSubmitForm)}>
                <AccordionComponent title="Filtros de Pesquisa">
                    <WrapperFilter columns={2}>
                        <DynamicSelect
                            id="equip"
                            label="Item"
                            options={equipmentData.map((item) => ({ value: item.id, label: item.name }))}
                            placeholder="Selecione o item"
                            control={control}
                        />
                        <DynamicSelect
                            id="status"
                            label="Status"
                            options={equipamentState.map((item) => ({ value: item.id, label: item.name }))}
                            placeholder="Selecione o status"
                            control={control}
                        />
                    </WrapperFilter>
                    <section className={styles['wrapper-filter']}>
                        <button type="button" onClick={handleResetForm} className={`${styles.button} ${styles['button--clear']}`}>
                            Limpar Filtros
                        </button>
                        <button
                            disabled={isSubmitting}
                            type="submit"
                            className={`${styles.button} ${styles['button--primary']}`}
                        >
                            <MagnifyingGlass size={20} weight="bold" />
                            Pesquisar
                        </button>
                    </section>
                </AccordionComponent>
            </form>
            <StickyHeadTable data={data} />
        </section>
    );
}

export default function Feed() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <FeedComponent />
        </Suspense>
    );
}