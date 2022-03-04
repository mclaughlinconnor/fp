import React from "react";
import {Text, View} from './Themed';
import {ColourService} from '../../styles/ColourService';

export function LinedHeading({text}: {text: string}) {
  const colourSvc = new ColourService({});

  const colour = colourSvc.getTextColour(undefined, 'surface')

  return (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <View style={{flex: 1, height: 1, backgroundColor: colour}} />
      <View>
        <Text style={{width: 50, textAlign: 'center'}}>{text}</Text>
      </View>
      <View style={{flex: 1, height: 1, backgroundColor: colour}} />
    </View>
  );
}