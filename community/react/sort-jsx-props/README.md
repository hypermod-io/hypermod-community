# sort-jsx-props

Sort props of JSX Components alphabetically.

_Credit_: [https://github.com/reactjs/react-codemod](https://github.com/reactjs/react-codemod)

```jsx
/* INPUT */
<Music
  zootWoman={true}
  rickJames={true}
  zapp={true}
/>

/* OUTPUT */
<Music
  rickJames={true}
  zapp={true}
  zootWoman={true}
/>
```

If a component uses spread props all properties before and after will be sorted, leaving the spread operation in place.

```jsx
/* INPUT */
<Music
  zootWoman={true}
  alpha
  {...foo}
  zapp={true}
  rickJames={true}
/>

/* OUTPUT */
<Music
  alpha
  zootWoman={true}
  {...foo}
  rickJames={true}
  zapp={true}
/>
```
