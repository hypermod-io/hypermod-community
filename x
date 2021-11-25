#!/usr/bin/env bash

set -e

mkdir -p .tmp/

for i in {1..1}; do cat > ./.tmp/$i.js <<EOF

import { Button, Badge, Checkbox } from '@pipedrive/convention-ui-react';
// const { Button } = require('@pipedrive/convention-ui-react');

// const cui = '@pipedrive/convention-ui-react';
// const { Button } = require(cui);

import foobar, { SomethingElseNotAButton } from "foo";

const a = (
  <Button color="black" size="lg" className="lit">
    lol haha
  </Button>
);

const a2 =
<Badge
	someProp="someValue"
	color="green"
>
	nice badge bro
</Badge>

const a3 =
<Badge
	someProp="someValue"
	color="tier-silver"
>
	this one too damn
</Badge>

const a4 = <Button
	color={{ ayyy: "lmao" }}
/>

const a5 = <Button
	color={"red"}
/>

const b = (
  <SomethingElseNotAButton size="lg" color="green" className="lit">
    lol haha
  </SomethingElseNotAButton>
);


import { EditableText } from "@pipedrive/convention-ui-react";

const e1 =
<EditableText
	before="lel"
	icon="hahaha change me"
	after="keep me too pls"
>
	cool text btw
</EditableText>


const e2 =
<EditableText
	before="lel"
	tooltipProps={{portalTo: document.body, placement: 'top'}}
	after="keep me too pls"
>
	cool text btw
</EditableText>



import { Input } from "@pipedrive/convention-ui-react"

let i1 = <Input color="red" foo="bar" message="lmao">
	here, remove the color property and change message to error="lmao"
</Input>;

// TODO FIXME - wtf only takes in the 1st element

let i2 = <Input color="red">
	only change me to error={true}
</Input>;

// test

let i3 = <Input foo="bar" message="lmao">
	and here, don't removed the color property, because there isn't one, and change message to error="lmao"
</Input>

import { Form } from "@pipedrive/convention-ui-react";

const form1 = <Form
	dont="modify"
	error={{ isError: true, text: "struggle is real" }}
	me="neither"
>
	nice
</Form>

const form2 = <Form
	dont="modify-either"
	error={{ isError: false }}
	// error="kekw"
	me="again"
>
	nice2
</Form>

import { Toggle } from "@pipedrive/convention-ui-react";

const toggle1 = <Toggle
	kek="w"
>
	nice
</Toggle>

const toggle2 = <Toggle
	prop="yeet"
/>

const inputcase1 = <Input color="red" /> // should be just error

const inputcase2 = <Input color="red" message="some error" /> // should be error="some error"

const inputcase3 = <Input             message="some error" /> // should be helper="some error"



const e3 = <EditableText />

const e4 =
<EditableText
    ohno="i am missing the show edit icon prop"
    surely="we are trolling"
    right={true}
>
</EditableText>



import styled from "styled-components";
import { colors } from "@pipedrive/convention-ui-react/dist/tokens"
import { fonts } from "somewhere"

const WrappedBtn = styled(Button)\`
	color: \${colors.black};
	font: \${fonts['\$font-body']};
	background-color: var(--pd-color-primary-or-something-lol); // prolly no?
\`

const wb1 = (
  <WrappedBtn size="lg" color="green" className="lit">
    lol haha
  </WrappedBtn>
);



import { Panel } from "@pipedrive/convention-ui-react"

<Panel
	elevation={16}
/>

<Panel
	elevation="16"
/>

<Panel
	elevation="01"
/>


const toggle3 =
<Toggle>
</ToggleNOPELOL>



<>
	<Button color="green" />
</>



const b69 = <Button
	color="black69FakeNews"
/>



import { Avatar } from "@pipedrive/convention-ui-react";
const av1 = <Avatar
	size="xs"
/>


import { Popover } from "@pipedrive/convention-ui-react";
const pop1 = <Popover
	arrow="lmao, delete me"
/>


EOF
done

pathOfOrigFile="/tmp/1.js"
cp .tmp/1.js "$pathOfOrigFile"

./run.js $*

# https://github.com/so-fancy/diff-so-fancy
if command -v diff-so-fancy &>/dev/null; then
	for i in {1..1}; do diff -u "$pathOfOrigFile" ./.tmp/$i.js | diff-so-fancy; done
else
	for i in {1..1}; do diff -u "$pathOfOrigFile" ./.tmp/$i.js                ; done
fi
