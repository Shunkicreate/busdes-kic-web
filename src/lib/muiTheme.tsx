import { styled } from '@mui/material/styles';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Dialog from '@mui/material/Dialog';
import { Tab } from '@mui/material';

export const TimeTableTabStyle = styled(Tab)(() => ({
    color: '#000',
    '& .Mui-selected': {
        background: 'red'

    }
}));

//参考ページ https://qiita.com/buncho_nk/items/f5b2b49952779b2257f6
