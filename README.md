# @romeovs/asdf-update-action

## Usage

Add a step to you workflow to update you `.tool-versions` depencies:

```yaml
- name: Update .tool-versions
  uses: romeovs/asdf-update-action@v1
  with:
    strategy: minor
```

### Inputs

- `path`: path of the `.tool-versions` file, defaults to `.tool-versions`
- `stragegy`: the semver specificity at which to match new versions

## Example workflow

```yaml
name: Get version info
on: push
jobs:
  build:
  runs-on: ubuntu-latest
  steps:
    - uses: actions/checkout@v3
    - uses: asdf-vm/actions/plugins-add@v3
    - name: Update .tool-versions
      uses: romeovs/asdf-update-action@v1
      with:
        strategy: minor
```

## License

The scripts and documentation in this project are released under the MIT License.
