class AddStatusToBackground < ActiveRecord::Migration[5.1]
  def change
    add_column :backgrounds, :status, :boolean
  end
end
