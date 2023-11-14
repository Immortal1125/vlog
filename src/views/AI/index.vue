<template></template>

<script setup>
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: "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",
});

async function main() {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: "You are a helpful assistant." }],
    model: "gpt-3.5-turbo",
  });

  console.log(completion.choices[0]);
}

main();
</script>
