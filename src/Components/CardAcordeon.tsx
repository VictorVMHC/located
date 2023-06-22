import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export const CardAcordeon = (props: any) => {
  const [expanded, setExpanded] = useState(false);

  const toggle = () => {
    setExpanded(!expanded);
  };

  return (
    <View style={styles.card}>
      <TouchableOpacity style={styles.cardHeader} onPress={toggle}>
        <Text style={styles.cardHeaderText}>{props.title}</Text>
        <Text style={styles.cardHeaderIcon}>{expanded ? '-' : '+'}</Text>
      </TouchableOpacity>
      {expanded && <View style={styles.cardContent}>{props.children}</View>}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#f2f2f2',
  },
  cardHeaderText: {
    fontWeight: 'bold',
  },
  cardHeaderIcon: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  cardContent: {
    padding: 10,
    backgroundColor: '#fff',
  },
});
