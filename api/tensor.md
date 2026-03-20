# torch.Tensor

## Tensor

A `torch.Tensor` is a multi-dimensional matrix containing numbers.

## Initializing Tensors

A tensor can be constructed from a Python `list` or sequence using the `torch.tensor()` constructor:

```python repl
torch.tensor([[1., -1.], [1., -1.]])
torch.tensor([1, 2, 3, 4])
```

You can also use tensor creation ops:

```python repl
torch.zeros(2, 3)
torch.ones(2, 3)
torch.randn(2, 3)
```

The contents of a tensor can be accessed and modified using Python’s indexing and slicing notation:

TODO

Use `torch.Tensor.item()` to get a Python number from a tensor containing a single value:

```python repl
x = torch.tensor([[1]])
x
x.item()
x = torch.tensor(2.5)
x
x.item()
```
