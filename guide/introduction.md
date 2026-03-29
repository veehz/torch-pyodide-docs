# Introduction

**torch** is a lightweight machine learning library for [Source Academy](https://sourceacademy.org), inspired by [PyTorch](https://pytorch.org). It is written in TypeScript/JavaScript and exposed to Python through a [Pyodide](https://pyodide.org/en/stable/) bridge.

## Why torch?

Source Academy runs in the browser. Real PyTorch cannot run in WebAssembly. torch fills that gap — it provides a familiar, PyTorch-like API for students learning machine learning concepts without requiring a local Python installation.

## Architecture

```
┌─────────────────────────────────┐
│        Python (Pyodide)         │
│   bridge.py  ←  your code       │
└────────────┬────────────────────┘
             │  JS ↔ Python FFI
┌────────────▼────────────────────┐
│    TypeScript / JavaScript      │
│     source-academy/torch        |
└─────────────────────────────────┘
```

The TypeScript core handles all computation. `bridge.py` wraps the JS objects in a Pythonic interface so you can write code that looks like standard PyTorch.
