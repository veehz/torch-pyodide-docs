# torch.optim

Optimization algorithms.

All optimizers take `model.parameters()` and a learning rate, then step the weights after a backward pass.

## Basic Usage

```python
optimizer = optim.SGD(model.parameters(), lr=0.01)

# Inside training loop:
optimizer.zero_grad()
loss.backward()
optimizer.step()
```

---

## Optimizers

### [[torch.optim.SGD]]

```python
optim.SGD(params, lr, momentum=0, dampening=0, weight_decay=0, nesterov=False, maximize=False)
```

Stochastic Gradient Descent.

**Parameters**

| Name           | Type    | Default | Description                                                        |
| -------------- | ------- | ------- | ------------------------------------------------------------------ |
| `params`       | `list`  | —       | List of parameters (from `model.parameters()`).                    |
| `lr`           | `float` | `0.001` | Learning rate.                                                     |
| `momentum`     | `float` | `0`     | Momentum factor.                                                   |
| `dampening`    | `float` | `0`     | Dampening for momentum.                                            |
| `weight_decay` | `float` | `0`     | Weight decay (L2 penalty).                                         |
| `nesterov`     | `bool`  | `False` | Enables Nesterov momentum.                                         |
| `maximize`     | `bool`  | `False` | Maximize the params based on the objective, instead of minimizing. |

**Example**

```python
optimizer = optim.SGD(model.parameters(), lr=0.01, momentum=0.9)
```

---

### [[torch.optim.Adam]]

```python
optim.Adam(params, lr=0.001, betas=(0.9, 0.999), eps=1e-8, weight_decay=0.0, amsgrad=False, maximize=False)
```

Adam optimizer.

**Parameters**

| Name           | Type    | Default        | Description                                                             |
| -------------- | ------- | -------------- | ----------------------------------------------------------------------- |
| `params`       | `list`  | —              | List of parameters.                                                     |
| `lr`           | `float` | `0.001`        | Learning rate.                                                          |
| `betas`        | `tuple` | `(0.9, 0.999)` | Coefficients for computing running averages of gradient and its square. |
| `eps`          | `float` | `1e-8`         | Numerical stability term.                                               |
| `weight_decay` | `float` | `0.0`          | Weight decay (L2 penalty).                                              |
| `amsgrad`      | `bool`  | `False`        | Whether to use the AMSGrad variant.                                     |
| `maximize`     | `bool`  | `False`        | Maximize the params based on the objective, instead of minimizing.      |

**Example**

```python
optimizer = optim.Adam(model.parameters(), lr=0.001)
```

---

## Methods

All optimizers share these methods:

### [[torch.optim.Optimizer.step]]

```python
optimizer.step()
```

Updates all parameters using their stored gradients. Call this after `loss.backward()`.

### [[torch.optim.Optimizer.zero_grad]]

```python
optimizer.zero_grad()
```

Resets gradients of all tracked parameters to zero. Call this before each `loss.backward()` to prevent gradient accumulation.
