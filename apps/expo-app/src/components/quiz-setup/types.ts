import { Dialog, DialogContent, DialogTrigger, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import {  QuizMode } from '@bq/shared/types';
import { IconKey } from '@/lib/content/icons.content';
import { createContext } from 'react';
import { variantMap } from '.';
import { DifficultyLevel } from "@bq/shared/types";
import { Pressable, View, StyleProp, ViewStyle } from "react-native";





export type QuizModalVariant = 'solo-quiz'| 'solo-no_timer_mode'



