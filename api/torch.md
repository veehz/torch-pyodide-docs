# torch

Top-level functions in the `torch` namespace.

## Contents

### Tensors

| Function | Description |
|---|---|
| [`is_tensor`](#torch-is-tensor) | Returns True if obj is a PyTorch tensor. |
| [`is_nonzero`](#torch-is-nonzero) | Returns True if the input is a single element tensor which is not equal to zero after type conversions. |
| [`numel`](#torch-numel) | Returns the total number of elements in the input tensor. |

#### Creation Ops

| Function | Description |
|---|---|
| [`tensor`](#torch-tensor) | Create a tensor from data. |
| [`zeros`](#torch-zeros) | Returns a tensor filled with the scalar value 0, with the shape defined by the variable argument size. |
| [`zeros_like`](#torch-zeros-like) | Returns a tensor filled with the scalar value 0, with the same shape as input |
| [`ones`](#torch-ones) | Returns a tensor filled with the scalar value 1, with the shape defined by the variable argument size. |
| [`ones_like`](#torch-ones-like) | Returns a tensor filled with the scalar value 1, with the same shape as input |
| [`empty`](#torch-empty) | Returns an uninitialized tensor. |
| [`empty_like`](#torch-empty-like) | Returns an uninitialized tensor with the same shape as input |
| [`full`](#torch-full) | Returns a tensor filled with the scalar value, with the shape defined by the variable argument size. |
| [`full_like`](#torch-full-like) | Returns a tensor filled with the scalar value, with the same shape as input |

### Random sampling

| Function | Description |
|---|---|
| [`seed`](#torch-seed) | Sets the seed for generating random numbers to a non-deterministic random number. |
| [`manual_seed`](#torch-manual-seed) | Sets the seed for generating random numbers. |
| [`rand`](#torch-rand) | Returns a tensor filled with random numbers from a uniform distribution on the interval $$ [0, 1) $$. |
| [`rand_like`](#torch-rand-like) | Returns a tensor with the same size as `input` that is filled with random numbers from a uniform distribution on the interval $$ [0, 1) $$. |
| [`randint`](#torch-randint) | Returns a tensor filled with random integers generated uniformly between `low` (inclusive) and `high` (exclusive). |
| [`randint_like`](#torch-randint-like) | Returns a tensor with the same shape as `input` that is filled with random integers generated uniformly between `low` (inclusive) and `high` (exclusive). |
| [`randn`](#torch-randn) | Returns a tensor filled with random numbers from a normal distribution with mean 0 and variance 1 (also called the standard normal distribution). |
| [`randn_like`](#torch-randn-like) | Returns a tensor with the same size as `input` that is filled with random numbers from a normal distribution with mean 0 and variance 1. |
| [`randperm`](#torch-randperm) | Returns a tensor containing a random permutation of integers in the interval $$ [0, n) $$. |

### Locally disabling gradient computation

The context manager `torch.no_grad()` is helpful for locally disabling and enabling gradient computation.

```python repl
x = torch.zeros(1, requires_grad=True)
with torch.no_grad():
    y = x * 2
y.requires_grad
```

| Function | Description |
|---|---|
| [`no_grad`](#torch-no-grad) | Context manager that disables gradient computation. |

### Math operations

todo

## Operations

### torch.abs

```python
torch.abs(input: Tensor) -> Tensor
```

Computes the absolute value of each element in `input`.

$$ \text{out}[i] = |\text{input}[i]| $$

**Example**

```python repl
torch.abs(torch.tensor([-1, -2, 3]))
```

### torch.add

```python
torch.add(input: Tensor, other: Tensor) -> Tensor
```

Adds `other` to `input`.

$$ \text{out}[i] = \text{input}[i] + \text{other}[i] $$

Supports broadcasting to a common shape.

**Example**

```python repl
a = torch.randn(4)
a
torch.add(a, 20)

b = torch.randn(4)
b
c = torch.randn(4, 1)
c
torch.add(b, c)
```
