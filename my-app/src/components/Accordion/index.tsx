'use client';

import { ReactNode, useCallback, useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import styles from './Accordion.module.css';
import TitleAccordion from '../TitleAccordion';
import useMedia from '@/hooks/useMedia';

interface AccordionType {
  title: string;
  icon?: ReactNode;
  children: ReactNode;
  id?: string;
  open?: boolean;
  setOpen?(): void;
}

const AccordionComponent: React.FC<AccordionType> = ({
  title,
  icon,
  children,
  id,
  open,
  setOpen,
}) => {
  const isMobile = useMedia(61.25);
  const [openAccordion, setOpenAccordion] = useState(true);
  const handleOpenAccordion = useCallback(() => {
    setOpenAccordion((oldState) => !oldState);
  }, [isMobile]);

  return (
    <div className={styles.WrapperAccordion}>
      <Accordion
        expanded={open || openAccordion}
        onChange={setOpen || handleOpenAccordion}
        className={styles.MuiAccordionRoot}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls={`${id}-content`}
          id={`${id}-header`}
          className={styles.MuiAccordionSummaryRoot}
        >
          <TitleAccordion title={title} icon={icon} noBorderBottom />
        </AccordionSummary>
        <AccordionDetails className={styles.MuiAccordionDetails}>
          {children}
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default AccordionComponent;