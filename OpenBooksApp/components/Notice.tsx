import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Colors from '../const/colors';
import { NoticeType } from '../types/stateTypes';

interface NoticeProps {
  noticeType: NoticeType;
}

const Notice: React.FC<NoticeProps> = ({noticeType}): JSX.Element => {
  return (
    <View
      style={noticeType === NoticeType.Searching ? styles.searchingNoticeBar : styles.noResultsNoticeBar}
    >
      <Text style={styles.noticeText}>
        {noticeType === NoticeType.Searching ? NoticeType.Searching : NoticeType.NoResults}
      </Text>
    </View>
  )
};

const styles = StyleSheet.create({
  noResultsNoticeBar: {
    backgroundColor: Colors.Red,
  },
  noticeText: {
    color: Colors.White,
    padding: 5,
  },
  searchingNoticeBar: {
    backgroundColor: Colors.Blue,
  },
})

export default Notice;