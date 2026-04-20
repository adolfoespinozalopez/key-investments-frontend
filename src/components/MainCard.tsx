import { forwardRef, ReactNode, Ref } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import Card, { CardProps } from '@mui/material/Card';
import CardContent, { CardContentProps } from '@mui/material/CardContent';
import CardHeader, { CardHeaderProps } from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import { SxProps, Theme } from '@mui/material';

// ==============================|| TYPES ||============================== //

export interface MainCardProps extends Omit<CardProps, 'title' | 'content'> {
  border?: boolean;
  boxShadow?: boolean;
  children?: ReactNode;
  subheader?: ReactNode | string;
  content?: boolean;
  contentSX?: CardContentProps['sx'];
  darkTitle?: boolean;
  divider?: boolean;
  elevation?: number;
  secondary?: ReactNode;
  shadow?: string;
  sx?: SxProps<Theme>;
  title?: ReactNode | string;
  codeHighlight?: boolean;
  codeString?: string;
  modal?: boolean;
}

// ==============================|| CUSTOM MAIN CARD ||============================== //

const MainCard = forwardRef(
  (
    {
      border = true,
      boxShadow,
      children,
      subheader,
      content = true,
      contentSX = {},
      darkTitle,
      divider = true,
      elevation,
      secondary,
      shadow,
      sx = {},
      title,
      codeHighlight = false,
      codeString,
      modal = false,
      ...others
    }: MainCardProps,
    ref: Ref<HTMLDivElement>
  ) => {
    const theme = useTheme();

    return (
      <Card
        elevation={elevation || 0}
        ref={ref}
        {...others}
        sx={{
          position: 'relative',
          border: border ? '1px solid' : 'none',
          borderColor: (theme as any).vars?.palette?.divider || theme.palette.divider,
          borderRadius: 1,
          boxShadow: boxShadow && !border ? shadow || (theme as any).vars?.customShadows?.z1 : 'inherit',
          ':hover': {
            boxShadow: boxShadow ? shadow || (theme as any).vars?.customShadows?.z1 : 'inherit'
          },
          ...(codeHighlight && {
            '& pre': {
              margin: 0,
              padding: '12px !important',
              fontFamily: theme.typography.fontFamily,
              fontSize: '0.75rem'
            }
          }),
          ...(modal && {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: { xs: `calc(100% - 50px)`, sm: 'auto' },
            maxWidth: 768
          }),
          ...((sx as any) || {})
        }}
      >
        {/* card header and action */}
        {!darkTitle && title && (
          <CardHeader
            sx={{ p: 2.5 }}
            slotProps={{
              title: { variant: 'subtitle1' },
              action: { sx: { m: '0px auto', alignSelf: 'center' } }
            }}
            title={title}
            action={secondary}
            subheader={subheader}
          />
        )}

        {darkTitle && title && (
          <CardHeader
            sx={{ p: 2.5 }}
            slotProps={{
              title: { variant: 'h4' }
            }}
            title={title}
            action={secondary}
            subheader={subheader}
          />
        )}

        {/* content & header divider */}
        {title && divider && <Divider />}

        {/* card content */}
        {content && <CardContent sx={contentSX}>{children}</CardContent>}
        {!content && children}
      </Card>
    );
  }
);

export default MainCard;