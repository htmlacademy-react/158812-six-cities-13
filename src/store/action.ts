import { createAction } from '@reduxjs/toolkit';
import { AppRoute } from '../const';
import { CommentData } from '../types/comment-data';

export const redirectToRoute = createAction<AppRoute>('app/redirectToRoute');

export const postComment = createAction('data/postComment', (newComment: CommentData) => ({payload: newComment}));
