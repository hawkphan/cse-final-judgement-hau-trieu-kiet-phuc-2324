import { AnimatePresence, motion, MotionProps } from 'framer-motion';
import React, { ReactNode } from 'react';
import '../styles.scss';
import { Stack } from '@mui/material';

const AccordionWrapper: React.FC<Props> = ({
  children,
  isExpanded = false,
  expanded,
  styles,
  ...props
}) => (
  <AnimatePresence initial={false}>
    <motion.section
      key="content"
      initial={isExpanded ? 'open' : 'collapsed'}
      animate={expanded ? 'open' : 'collapsed'}
      variants={{
        open: { opacity: 1, height: 'auto' },
        collapsed: { opacity: 0, height: 0 },
      }}
      transition={{ duration: 0.6, ease: [0.04, 0.62, 0.23, 0.98] }}
      {...props}
    >
      <Stack style={styles}>{children}</Stack>
    </motion.section>
  </AnimatePresence>
);

type Props = MotionProps & {
  children: ReactNode;
  isExpanded?: boolean;
  expanded?: boolean;
  styles?: React.CSSProperties;
};

export default AccordionWrapper;
